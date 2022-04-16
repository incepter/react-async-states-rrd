import React from "react";
import {
  Routes as RRoutes,
  Route as RRoute,
  useParams
} from "react-router-dom";
import { useAsyncState } from "react-async-states";

const RouteContext = React.createContext(null);

export function useRouteData() {
  const routeData = React.useContext(RouteContext);
  if (!routeData) {
    throw new Error("You cannot use useRouteData outside a route");
  }
  return routeData;
}

export function RouteComponent({
  producer,
  children,
  getPayload = () => {},
  fallback = null,
  getDeps = () => [],
  ...rest
}) {
  const params = useParams();
  const props = useAsyncState.auto(
    { producer, payload: getPayload(params) },
    getDeps(params)
  );

  const renderProps = { ...props, params };

  return (
    <RouteContext.Provider value={props}>
      {render(
        props.state.status === "success" ? children : fallback,
        renderProps
      )}
    </RouteContext.Provider>
  );
}

export default function Routes({ routes }) {
  if (!Array.isArray(routes) || routes.length === 0) {
    throw new Error(
      "Routes component expects a single prop 'routes': not empty array"
    );
  }
  return <RRoutes>{renderRoutes(routes)}</RRoutes>;
}

function renderRoutes(routes) {
  return routes.map((route) => (
    <RRoute
      key={route.path}
      {...route.routeProps}
      path={route.path}
      element={
        <RouteComponent
          getDeps={route.getDeps}
          children={route.render}
          fallback={route.fallback}
          producer={route.producer}
          getPayload={route.getPayload}
        />
      }
      children={
        hasNestedRoutes(route) ? renderRoutes(route.nestedRoutes) : null
      }
    />
  ));
}

function hasNestedRoutes(route) {
  return Array.isArray(route.nestedRoutes) && route.nestedRoutes.length > 0;
}

function render(comp, props) {
  return typeof comp === "function" ? React.createElement(comp, props) : comp;
}
